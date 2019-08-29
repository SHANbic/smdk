const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is great',
      content: 'reeeeeaaally great'
    });
    comment = new Comment({ content: 'Yeah sure' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it.only('saves a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' }).then(user => {
      console.log(user);
      done();
    });
  });
});
