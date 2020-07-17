# read me
## Combined filters:
Ensure the property is in the JSON as either a tag or a genre.
Add an li in the appropriate id="filterGenre" or id="filterTags" ul, replacing 'placeholder' with the chosen string.
In the li place a radio toggle with this structure
    <label>
      <input id='poetry' type='radio' name='toggle' value='poetry'>
      poetry
    </label>
    
In the corresponding getElementById for "filterGenre" or "filterTags" (begin ~line710) add an else if option with this structure for a genre:

  else if (genreSelect === 'placeholder') {
  genreID = ["==",["get","genre"],"placeholder"];
  }

or this for a tag:

  else if (tagSelect === 'placeholder') {
  tagID = ["==",["get","tag"],"placeholder"];
  }

Again, replace placeholder with the chosen string.

## Focus map on a particular story location:
Within:
var map = new mapboxgl.Map({
 container: "map",
 // TK this loaded style is basically just map colours and text styling
 style: "mapbox://styles/urban-field-naturalist/ckbll7ri40jnf1ilpp9gcin4w",
 // TK set location for start of this story, point to 'One Good Tern ..'
 		center: [
      -81.0100000000000051159076974727213382720947265625,
      1.2600000000000000088817841970012523233890533447265625
    ],
    // TK zoom level at start is low for big map
 zoom: 2
});

Set center:[] to include the co-ords of the chosen story, this data should be in the JSON
