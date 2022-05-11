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

delete from Review


select AVG(Cast(Score as decimal)) as Score from Review 
where StoryID = 125

exec getUserBlogs 8

select * from AppUser 

update AppUser set 
Active = 1 where IDUser = 8

select * from Comment

insert into Comment values ('prvi komentar user 8', 8, 125),  ('drugi komentar user 8', 8, 125), ('prvi komentar user 9', 9, 125),  ('prvi komentar user 10', 10, 125)

select * from Review

select * from Story
select * from post