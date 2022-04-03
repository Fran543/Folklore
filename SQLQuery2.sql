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
	@Password nvarchar(50),
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
	@Password nvarchar(50),
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


--POST

create table Post(
	IDPost int primary key identity,
	PostName nvarchar(50) NOT NULL,
	Content nvarchar(max),
	PubDate date NOT NULL,
	Summary nvarchar(500) NOT NULL,
	ImageBlob nvarchar(max),
	UserID int foreign key references AppUser(IDUser),
)
go

create table StoryConnection(
	IDStoryConnection int primary key identity,
	PreStory int foreign key references Post(IDPost),
	SequelStory int foreign key references Post(IDPost)
)
go

create table WarningPost(
	IDWarningPost int primary key identity,
	WarningID int foreign key references Warning(IDWarning),
	PostID int foreign key references Post(IDPost)
)
go

create table Comment (
	IDComment int primary key identity,
	Content nvarchar(max),
	UserID int foreign key references AppUser(IDUser),
	PostID int foreign key references Post(IDPost)
)

create table Review (
	IDReview int primary key identity,
	Score int,
	UserID int foreign key references AppUser(IDUser),
	PostID int foreign key references Post(IDPost)
)
go

create proc createPost
	@PostName nvarchar(50),
	@Content nvarchar(max),
	@Summary nvarchar(500),
	@ImageBlob nvarchar(max),
	@IDPost int output
as
begin
	insert into Post (PostName, Content, PubDate, Summary, ImageBlob) values (@PostName, @Content, GETDATE(), @Summary, @ImageBlob)
	set @IDPost = SCOPE_IDENTITY()
end

go

create proc selectPosts
as
begin 
	select *
	from Post
end
go
