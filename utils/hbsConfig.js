import hbs from 'hbs';

const config = () => {
    /**
     * Load all partials form views/partials
     * !!! Can take callback as 2nd arg
     */
    hbs.registerPartials(appRoot + '/views/partials');


    hbs.registerHelper('activePageHelper', function(currentPage, pageName) {
        if(currentPage === pageName) {
            return "active";
        } else {
            return "";
        }
  });

    hbs.registerHelper('renderUserPostCardLinks', function (user) {
        let userObj = user.data.root.user ;
        let slug = this.slug;
        let str = "<p>";
       
        str += `<a href="/post/show-post/${slug}" class="card-link">Show</a>`;
        str += `<a href="/post/edit-post/${slug}" class="card-link">Edit</a>`;
      str += `<a href="/post/delete-post/${slug}" class="card-link"  id="post-delete-btn">Delete</a></p>`;
      if ( userObj && userObj.id.toString() === this.userRef.toString()) {
        return new hbs.SafeString(str);
      }
    });

  hbs.registerHelper('renderLikenessIcon', function(likeness) {
    let result = "";
    if(likeness === 'none') {

    } else if(likeness === '') {

    } else if(likeness === '') {

    }

    return new hbs
  });

};

export default config;
