import hbs from 'hbs';

export const hbsHelper = () => {
    hbs.registerHelper('activePageHelper', function(currentPage, pageName) {
        if(currentPage === pageName) {
            return "active";
        } else {
            return "";
        }
    });
};

export const slugify = (text) => {
    return text.toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
};
