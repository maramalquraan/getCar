angular.module('get-car')

// this part is responsible of showing the cars ..

.component('show', {
  bindings: {
	car: "<"
  },

	templateUrl: `
	client/templates/show.html
	`
});

/*
          Seem to be or not seem to be....
                    \
                         ,,,,,,
                        /e   ''(
                       (_ `     \
                      ___>       \
                     / ,_\-.___   \_
                    /  _)/ /        \
                    |  \  /  ` _     |
                  __\____/    /    ' |
                 /  _        /______/
                / _/ \,_____/o     (
                \__)/`              \
                   /   \__________/_/_
                 _/     \  \   )/     \
                /      /   |  /\      (
                \_____/ ___/  \ \  _/  \
           ______/_/___|_|     ) \     /
          /       o\     o\   /  /    /\
       ,,,'-----^--',,,,,,',,|_,,\_ ,,\/,,
*/