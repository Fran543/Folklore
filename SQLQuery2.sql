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
	select *
	from Story
end
go

create proc selectStory
@IDStory int
as
begin 
	select *
	from Story as s
	where IDStory = @IDStory
	select top 1 * 
	from Post 
	Where StoryID = @IDStory
	declare @idPost int
	set @idPost = (select top 1 IDPost 
	from Post 
	Where StoryID = @IDStory)
	select * 
	from Choice 
	where PostID = @idPOst	
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
	select * from Story as s
	inner join UserStory as us on s.IDStory = us.StoryID
	where us.UserID = @IDUser
go

create proc getUserBlogs
	@IDUser int
as
begin
	select * from Story 
	where UserID = @IDUser 
	and (select COUNT(*) from Post where Post.StoryID = Story.IDStory) = 1
end

go

create proc getUserStories
	@IDUser int
as
begin
	select * from Story 
	where UserID = @IDUser 
	and (select COUNT(*) from Post where Post.StoryID = Story.IDStory) > 1
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

create proc getTop10StoriesByReview
as
	select distinct top 10  s.*, 
		AVG(Cast(r.Score as decimal)) OVER(PARTITION BY s.IDStory) AS AvgREv
	from Story as s
	inner join Review as r on s.IDStory = r.StoryID
	order by AvgREv desc
go

select * from post 
select * from PostChoice
select * from Choice

exec selectStory 128

exec selectPostByChoiceId 466
exec getSearchItems

select * from Story 


select * from AppUser
go

exec getUserLibrary 8

exec removeStoryFromUser 8, 128

	update AppUser set
		Active = 1
	where IDUser = 8

	insert into UserStory values (8, 125), (8, 127), (8,128)

	insert into PostChoice values (243, 473)
select * from post 
select * from PostChoice
declare @user_id_list varchar(max)
set @user_id_list = '471, 473'


select  p.IDPost, (SELECT COUNT(*) FROM PostChoice as pcc where pcc.PostID = p.IDPost group by PostID) as pcon, count(*) as pccc from Post as p
inner join PostChoice as pc on p.IDPost = pc.PostID
WHERE pc.ChoiceID IN (SELECT value FROM STRING_SPLIT( @user_id_list, ','))
and (SELECT COUNT(*) FROM PostChoice as pcc where pcc.PostID = p.IDPost group by PostID) = (SELECT COUNT(*) FROM STRING_SPLIT( @user_id_list, ','))
group by p.IDPost
having count(*) = (SELECT COUNT(*) FROM STRING_SPLIT( @user_id_list, ','))

select * from PostChoice
declare @user_id_list varchar(max)
set @user_id_list = '471'

exec getPostbyConditions @user_id_list

select * from AppUser
select * from Story 
select * from Review

insert into Review values (3, 8, 125), (2, 9, 125), (4, 10, 125), (5, 11, 125),
						 (3, 8, 127), (1, 9, 127), (3, 10, 127), (4, 11, 127),
						 (1, 8, 128), (1, 9, 128), (4, 10, 128), (5, 11, 128),
						 (3, 8, 129), (2, 9, 129), (1, 10, 129), (1, 11, 129),
						 (3, 8, 130), (4, 9, 130), (1, 10, 130), (5, 11, 130),
						 (2, 8, 224), (2, 9, 224), (2, 10, 224), (5, 11, 224),
						 (5, 8, 225), (3, 9, 225), (1, 10, 225), (5, 11, 225),
						 (4, 8, 226), (1, 9, 226), (5, 10, 226), (5, 11, 226),
						 (3, 8, 227), (1, 9, 227), (3, 10, 227), (5, 11, 227),
						 (2, 8, 228), (5, 9, 228), (2, 10, 228), (5, 11, 228),
						 (1, 8, 229), (2, 9, 229), (1, 10, 229), (3, 11, 229)


select AVG(Cast(Score as decimal)) from Review 
where StoryID = 125

exec getUserBlogs 8