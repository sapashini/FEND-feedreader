/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
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


        /* The second test here,loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url is defined', () => {
			for(let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
        });

        /* The last test in this suite loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          it('name is defined', () => {
			for(let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
        });
    });


    describe('The menu', () => {
    	const body = document.querySelector('body');
        /* First test in this suite, ensures the menu element is
         * hidden by default.
         */
         it('is hiden', () => {
			expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* The second test ensures that,the menu changes
          * visibility when its icon is clicked.
    	 */
    	it('changes visibility', () => {
    		const menu = document.querySelector('.menu-icon-link');

			menu.click();
			expect(body.classList.contains('menu-hidden')).toBe(false);
			menu.click();
			expect(body.classList.contains('menu-hidden')).toBe(true);
		});
    });


    var feed = document.querySelector('.feed');

	describe('Initial Entries', () => {

        /* This test ensures that, when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach((done) => {
			 loadFeed(0, done);
		 });

		 it('completes its work', () => {
			expect(feed.children.length > 0).toBe(true);
		 });
	});


    describe('New Feed Selection', () => {
    	const firstFeed = [];

        /* This test ensures that, when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        beforeEach((done) => {
			loadFeed(0);
			Array.from(feed.children).forEach((entry) => {
				firstFeed.push(entry.innerText);
			});
			loadFeed(1, done);
		 });

		it('content actually changes', () => {
			Array.from(feed.children).forEach((entry,index) => {
				expect(entry.innerText === firstFeed[index]).toBe(false);
			});

		});
    });
}());
