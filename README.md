react-tile
==========

A spike for building a quick trade tile using React.

Demo available here: [http://adamshone.github.io/react-tile/app/](http://adamshone.github.io/react-tile/app/).

Install
-------

 * git clone https://github.com/adamshone/react-tile.git 
 * npm install
 * grunt serve

 The demo runs on port 8000.

Implemented
-----------

 * price updates
 * change currency pair (must be changed to a six character string)
 * dealt currency toggle
 * amount change (only valid numbers are accepted)
 * ~~package management instead of lots of script tags (Webpack?)~~

Next
----

 * add propTypes to make the components fail fast if they don't get the right props
 * unit tests
 * if you use `display: inline-block` the whole component gets repainted always. Need to find out why.
