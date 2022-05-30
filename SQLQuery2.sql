create database FolkloreDatabase
go

use FolkloreDatabase
go

--USER

CREATE table AppUser(
	IDUser int primary key identity,
	Username nvarchar(50) NOT NULL,
	Email nvarchar(50) NOT NULL,
	Password nvarchar(max) NOT NULL,
	Active bit NOT NULL
)
go



--CLIENT CRUD

create proc createUser
	@Username nvarchar(50),
	@Email nvarchar(50),
	@Password nvarchar(max),
	@Active bit,
	@IDUser int output
as
begin
	insert into AppUser (Username, Email, Password, Active) values (@Username, @Email, @Password, @Active)
	set @IDUser = SCOPE_IDENTITY()
end
go

create proc selectUsers 
as
begin 
	select u.IDUser, u.Email, u.Username, u.Password, u.Active
	from AppUser as u
end
go

create proc selectUser
	@IDUser int
as
begin 
	select u.IDUser, u.Email, u.Username, u.Password, u.Active
	from AppUser as u
	where IDUser = @IDUser
end
go

create proc updatePassword
	@Password nvarchar(max),
	@IDUser int 
as
begin
	update AppUser set
		Password = @Password
	where IDUser = @IDUser
end
go

create proc deleteUser
	@IDUser int
as
begin
	update AppUser set
		Active = 0
	where IDUser = @IDUser
end
go


--Warning

create table Warning(
	IDWarning int primary key identity,
	WarningName nvarchar(max) NOT NULL
)
go

insert into Warning values ('Rape and Sexual Assault'),
							('Abuse (physical, mental, emotional, verbal, sexual)'),
							('Child abuse/pedophilia'),
							('Animal cruelty or animal death'),
							('Self-injurious behavior (self-harm, eating disorders, etc.)'),
							('Suicide'),
							('Excessive or gratuitous violence'),
							('Needles'),
							('Depiction of pornography (including child pornography)'),
							('Incest (including any and all elements of romantic or sexual relationships between family, tonal in theme, thought, or activity)'),
							('Kidnapping (forceful deprivation of/disregard for personal autonomy)'),
							('Pregnancy/Childbirth'),
							('Miscarriages/Abortion'),
							('Blood'),
							('Mental illness')

go

create proc selectWarnings
as
begin 
	select *
	from Warning
end
go

create table Story(
	IDStory int primary key identity,
	StoryName nvarchar(50) NOT NULL,
	PubDate date NOT NULL,
	Summary nvarchar(500) NOT NULL,
	ImageBlob nvarchar(max),
	UserID int foreign key references AppUser(IDUser)

)
go

create table WarningStory(
	IDWarningStory int primary key identity,
	WarningID int foreign key references Warning(IDWarning),
	StoryID int foreign key references Story(IDStory)
)
go

create proc createStory
	@StoryName nvarchar(50),
	@Summary nvarchar(500),
	@ImageBlob nvarchar(max),
	@UserID int,
	@IDStory int output
as
begin
	insert into Story (StoryName, PubDate, Summary, ImageBlob, UserID) values (@StoryName, GETDATE(), @Summary, @ImageBlob, @UserID)
	set @IDStory = SCOPE_IDENTITY()
end

go

create  proc addWarningToStory
	@WarningID int,
	@StoryID int

as
begin
	insert into WarningStory values (@WarningID, @StoryID)	
end

go


--POST

create table Comment (
	IDComment int primary key identity,
	Content nvarchar(max),
	UserID int foreign key references AppUser(IDUser),
	StoryID int foreign key references Story(IDStory)
)

create table Review (
	IDReview int primary key identity,
	Score int,
	UserID int foreign key references AppUser(IDUser),
	StoryID int foreign key references Story(IDStory)
)
go

create table Post(
	IDPost int primary key identity,
	Content nvarchar(max),
	ImageBlob nvarchar(max),
	StoryID int foreign key references Story(IDStory)
)
go

create table Choice(
	IDChoice int primary key identity,
	Content nvarchar(max),
	PostID int foreign key references Post(IDPost)
)
go

create table PostChoice(
	IDPostChoice int primary key identity,
	PostID int foreign key references Post(IDPost),
	ChoiceID int foreign key references Choice(IDChoice)
)
go

create table UserStory(
	IDUserStory int primary key identity,
	UserID int foreign key references AppUser(IDUser),
	StoryID int foreign key references Story(IDStory)
)
go



create proc createPost
	@Content nvarchar(max),
	@ImageBlob nvarchar(max),
	@StoryID int,
	@IDPost int output
as
begin
	insert into Post (Content, ImageBlob, StoryID) values (@Content, @ImageBlob, @StoryID)
	set @IDPost = SCOPE_IDENTITY()
end

go

create proc createChoice
	@Content nvarchar(max),
	@PostID int,
	@IDChoice int output
as
begin
	insert into Choice (Content, PostID) values (@Content, @PostID)
	set @IDChoice = SCOPE_IDENTITY()
end

go

create proc selectPosts
as
begin 
	select *
	from Post
end
go

create proc selectStories
as
begin 
	select s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username, AVG(Cast(r.Score as decimal)) as Score, COUNT(distinct c.IDComment) as CommentNbr
	from Story as s
	left join AppUser as u on s.UserID = u.IDUser
	left join Review as r on s.IDStory = r.StoryID
	left join Comment as c on s.IDStory = c.StoryID
	group by s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username
end
go


create proc getTop10StoriesByReview
as
	select distinct top 10  s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username, AVG(Cast(r.Score as decimal)) as Score, COUNT(distinct c.IDComment) as CommentNbr
	from Story as s
	left join AppUser as u on s.UserID = u.IDUser
	left join Review as r on s.IDStory = r.StoryID
	left join Comment as c on s.IDStory = c.StoryID
	group by s.UserID, s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username	
	order by Score desc
go


create proc selectStory
@IDStory int
as
begin 
	select *, (select AVG(Cast(Score as decimal)) from Review 
	where StoryID = @IDStory)as Score
	from Story as s
	where IDStory = @IDStory
	
	select * from WarningStory
	where StoryID = @IDStory

	select top 1 * 
	from Post 
	Where StoryID = @IDStory
	declare @idPost int
	set @idPost = (select top 1 IDPost 
	from Post 
	Where StoryID = @IDStory)
	
	select * 
	from Choice 
	where PostID = @idPost	

	select c.Content, u.Username from Comment as c
	inner join AppUser as u on c.UserID = u.IDUser
	where StoryID = @IDStory
	
end
go

create proc selectStoryComments
@IDStory int
as
begin 
	select c.Content, u.Username
	from Comment as c
	inner join AppUser as u on c.UserID = u.IDUser
	where c.StoryID = @IDStory
end
go


create proc selectStoryWarnings
@IDStory int
as
begin 
	select w.WarningName
	from Warning as w
	inner join WarningStory as ws on w.IDWarning = ws.WarningID
	where ws.StoryID = @IDStory
end
go

create proc addCommentToStory
	@Content nvarchar(max),
	@IDUser int,
	@IDStory int,
	@IDComment int output
as
begin
	insert into Comment (Content, UserID, StoryID) values (@Content, @IDUser, @IDStory)
	set @IDComment = SCOPE_IDENTITY()
end

go

create proc addReviwToStory
	@Score int,
	@IDUser int,
	@IDStory int,
	@IDReview int output
as
IF NOT EXISTS (SELECT * FROM Review WHERE UserID = @IDUser and StoryID = @IDStory) 
	BEGIN
		insert into Review(Score, UserID, StoryID) values (@Score, @IDUser, @IDStory)
		set @IDReview = SCOPE_IDENTITY()
	END
ELSE
	BEGIN
		UPDATE Review
		set Score = @Score
		where UserID = @IDUser and StoryID = @IDStory
	END
go

create proc getUserStoryReview
	@IDUser int,
	@IDStory int
as
begin
	select score from Review
	where UserID = @IDUser and StoryID = @IDStory
end
go


create proc addConditionToPost
	@PostID int,
	@ChoiceID int,
	@IDPostChoice int output
as
begin
	insert into PostChoice (PostID, ChoiceID) values (@PostID, @ChoiceID)
	set @IDPostChoice = SCOPE_IDENTITY()
end

go

create proc getUserLibrary
	@IDUser int
as
	select s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username, AVG(Cast(r.Score as decimal)) as Score, COUNT(distinct c.IDComment) as CommentNbr
	from Story as s
	left join AppUser as u on s.UserID = u.IDUser
	left join Review as r on s.IDStory = r.StoryID
	left join Comment as c on s.IDStory = c.StoryID
	inner join UserStory as us on s.IDStory = us.StoryID
	group by us.UserID, s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username	
	having us.UserID = @IDUser

go

create proc getUserBlogs
	@IDUser int
as
begin
	select s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username, AVG(Cast(r.Score as decimal)) as Score, COUNT(distinct c.IDComment) as CommentNbr
	from Story as s
	left join AppUser as u on s.UserID = u.IDUser
	left join Review as r on s.IDStory = r.StoryID
	left join Comment as c on s.IDStory = c.StoryID
	group by s.UserID, s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username	
	having s.UserID = @IDUser
	and (select COUNT(*) from Post where Post.StoryID = s.IDStory) = 1
end

go

create proc getUserStories
	@IDUser int
as
begin
	select s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username, AVG(Cast(r.Score as decimal)) as Score, COUNT(distinct c.IDComment) as CommentNbr
	from Story as s
	left join AppUser as u on s.UserID = u.IDUser
	left join Review as r on s.IDStory = r.StoryID
	left join Comment as c on s.IDStory = c.StoryID
	group by s.UserID, s.IDStory, s.ImageBlob, s.PubDate, s.StoryName, s.Summary, u.Username	
	having s.UserID = @IDUser
	and (select COUNT(*) from Post where Post.StoryID = s.IDStory) > 1
end

go



create proc selectPostByChoiceId
@IDChoice int
as
begin 
	select p.*
	from Post as p
	inner join PostChoice as pc on p.IDPost = pc.PostID
	where pc.ChoiceID = @IDChoice
	select * from Choice where PostID = (select p.IDPost
	from Post as p
	inner join PostChoice as pc on p.IDPost = pc.PostID
	where pc.ChoiceID = @IDChoice)
end
go

create proc getSearchItems
as
select IDUser, Username from AppUser
select s.IDStory, s.StoryName, u.Username
from Story as s
inner join AppUser as u on s.UserID = u.IDUser
go

create proc removeStoryFromUser
	@UserID int,
	@StoryID int

as
	delete from UserStory 
	where UserID = @UserID and StoryID = @StoryID
go

create FUNCTION doesStoryExistsInLibrary(	@UserID int, @StoryID int) RETURNS bit
as
BEGIN
	if exists(select * from UserStory where UserID = @UserID and StoryID = @StoryID)
	begin
		return 1
	end
	return 0
		
END
go

create proc addStoryToUser
	@UserID int,
	@StoryID int

as
	if (dbo.doesStoryExistsInLibrary(@UserID, @StoryID) = 0)
	begin 
		insert into UserStory (UserID, StoryID)
		values (@UserID, @StoryID)
	end
go


create FUNCTION getIDPostbyConditions(@Conditions_list nvarchar(max)) RETURNS int
as
BEGIN
    DECLARE @IDPost int;
    SET @IDPost = (select top 1 p.IDPost from Post as p
						inner join PostChoice as pc on p.IDPost = pc.PostID
						WHERE pc.ChoiceID IN (SELECT value FROM STRING_SPLIT( @Conditions_list, ','))
						and (SELECT COUNT(*) FROM PostChoice as pch where pch.PostID = p.IDPost group by PostID) = (SELECT COUNT(*) FROM STRING_SPLIT( @Conditions_list, ','))
						group by p.IDPost
						having count(*) = (SELECT COUNT(*) FROM STRING_SPLIT( @Conditions_list, ','))
					);
    RETURN @IDPost;
END

go

create proc getPostbyConditions
	@Conditions_list nvarchar(max)
as
	select * from Post
	where IDPost = dbo.getIDPostbyConditions(@Conditions_list)
go

