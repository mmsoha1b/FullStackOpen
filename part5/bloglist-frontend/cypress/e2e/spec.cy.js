const { func } = require("prop-types");

describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user={
      name:'name',
      username: 'UserName', 
      password: 'Password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user); 
    cy.visit('http://localhost:3000');
  });
  it('logon form is shown',function(){
    cy.contains('login');
  });
  describe('Logon',function(){

    it('logins with right credentials',function(){
      cy.get('#username-input').type('UserName');
      cy.get("#password-input").type('Password');
      cy.get('#login-button').click();
      cy.contains('UserName logged in')
    });

    it('fails login with wrong credentials',function(){
      cy.get('#username-input').type('Username');
      cy.get("#password-input").type('P@ssword');
      cy.get('#login-button').click();
      cy.contains('Request failed with status code 401');
    })
  })
  describe('When logged in ',function(){
    beforeEach(function(){
      cy.request('POST','http://localhost:3003/api/login',{username:'UserName',password:'Password'})
      .then(response => {
              localStorage.setItem('loggedInUser',
              JSON.stringify(response.body));      
              cy.visit('http://localhost:3000');
    })})
    it('A blog can be created',function(){
      cy.get('#input-title').type('New title');
      cy.get('#input-author').type("New author");
      cy.get('#input-url').type("http://newurl.com");
      cy.get('#create-blog-button').click();
      cy.contains('New title New author')
    })
    it('User can like a blog',function(){
      cy.makeBlog({
        title:"new title",
        author:"author",
        url:"url"
      });
      cy.contains('view').click();
      cy.get('#likes').invoke('text').then(text=>{
        return parseInt(text.slice(6,8));
      }).then(beforeLikes=>{
        cy.get('#like-button').click();
        cy.get('#likes').invoke('text').then(text=>{
         const afterLikes = parseInt(text.slice(6,8));
         expect(afterLikes).to.eq(beforeLikes+1);
        })
      })
    })
    it('User can delete his blog',function(){
      cy.makeBlog({
        title:"new title",
        author:"author",
        url:"url"
      });
      cy.contains('view').click();
      cy.contains('remove').click();
      cy.get('.blog').should('not.exist');
    })
    it.only('Sorts blogs by liked',function(){
      cy.makeBlog({
        title:"2nd most likes",
        author:"author",
        url:"url"
      })
      cy.makeBlog({
        title:"most likes",
        author:"author",
        url:"url"
      })
      cy.contains('view').click();
      cy.get("#like-button").click();
      cy.get('.blog').eq(0).should('contain', 'most likes')
      cy.get('.blog').eq(1).should('contain', '2nd most likes')
    })
  })
})