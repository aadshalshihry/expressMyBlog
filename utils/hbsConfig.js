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
        let t = user.data.root.user ;
        let slug = this.slug;
        let str = "";
        str += `<a href="/post/show-post/${slug}" class="card-link">Show</a>`;
        str += `<a href="/post/edit-post/${slug}" class="card-link">Edit</a>`;
        str += `<a href="/post/delete-post/${slug}" class="card-link"  id="post-delete-btn">Delete</a>`;
        if ( t.id.toString() === this.user.toString()) {
            return new hbs.SafeString(str);
        }
    });

};

export default config;