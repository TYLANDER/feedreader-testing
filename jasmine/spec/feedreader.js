/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */


    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs defined', function(){
           for (var i = 0; i < allFeeds.length; i++) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           }
         });



         it('have names defined', function () {
           for (var i = 0; i < allFeeds.length; i++) {
            expect(allFeeds[i].name).toBeDefined();
            expect(allFeeds[i].name.length).not.toBe(0);
           }
       });
    });

    describe('The Menu', function () {

      it('element is hidden', function () {
        expect($('body').hasClass('menu-hidden')).toEqual(true);
      });
      /* TODO: Write a test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it('visibility changes on click event', function () {
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').trigger('click');
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

      beforeEach(function (done) {
        loadFeed(0, function () {
          done();
        });
      });

      it('has at least one entry', function () {
        expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
      var firstFeed, secondFeed;

      beforeEach(function (done) {
        $('.feed').empty();
        loadFeed(1, function () {

          //Tests if first feed is loaded
          console.log('First feed loaded!');

          //Load and check first entry
          firstFeed = $('.feed').html();
          loadFeed(2, function() {

            console.log('Second feed loaded!');
            done();
          });
        });
      });

          afterEach(function() {
            loadFeed(0);
          });

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      it('has new content', function () {
        secondFeed = $('.feed').html();
        expect(firstFeed).not.toEqual(secondFeed);
      });
    });
}());
