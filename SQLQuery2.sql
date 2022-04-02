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
