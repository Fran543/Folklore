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

