ws_bootstrap
============

A Drupal Subtheme of Bootstrap Theme which uses Sass Bootstrap & Libsass. Sass is compiled using Grunt.


## Getting Started

`npm install`

'grunt init` to get setup, and then

`grunt` to compile scss & js, and watch with [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).

## Adding External Libaries

The easiest way to add external libraries is using Bower.
e.g. `bower install jquery`

Then add the required js & css paths at the top of Gruntfile.js in the bower array.

Finally run `grunt bower-compile`. This will add the js and css files to the project

## Sass Globbing

Any files or folders added in the components directory will be automatically inculded using Sass Globbing.

## Javascript

After running `grunt` any changes made in scripts.js will be compiled into scripts.min.js which is loaded into the project.

## A quick word on Bootstrap Grids

### Container

This sets up a max-width which changes at various breakpoints.
**Never put a container inside a container.**

### Row

Rows are a place for columns to go inside. Basically all they do is add a 15px negative margin on each side. This helps align columns properly. A row must always go inside a container.

### Column

Columns always must be within a row.

## And please don't use any id's :)



