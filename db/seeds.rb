# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Board.delete_all
List.delete_all
Card.delete_all
User.delete_all
UserBoard.delete_all

Board.create({
  name: "My First Board"
})

List.create([
  {
    title: "Ice Box",
    board_id: 1,
    position: 1
  },
  {
    title: "Backlog",
    board_id: 1,
    position: 2
  },
  {
    title: "In Progress",
    board_id: 1,
    position: 3
  },
  {
    title: "Under Review",
    board_id: 1,
    position: 4
  },
  {
    title: "Done",
    board_id: 1,
    position: 5
  }
])

Card.create([
  {
    text: "Build the next Facebook",
    list_id: 1,
    position: 1
  },
  {
    text: "Get ready to write awesome front end JavaScript",
    list_id: 2,
    position: 1
  },
  {
    text: "Learn Fullstack web development",
    list_id: 3,
    position: 1
  },
  {
    text: "Become awesome",
    list_id: 4,
    position: 1
  },
  {
    text: "Learn Ruby",
    list_id: 5,
    position: 1
  }
])

User.create({
  email: "tom@myspace.com",
  password: "supersecure123"
})

UserBoard.create({
  user_id: 1,
  board_id: 1
})
