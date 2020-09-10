# read me
## Combined filters:
Ensure the property is in the JSON as either a tag or a genre.
Add an li in the appropriate id="filterGenre" or id="filterTags" ul, replacing 'placeholder' with the chosen string.
  <li>
    <label>
      <input id='placeholder' type='radio' name='toggle' value='placeholder'>
      placeholder
    </label>
  </li>

In the corresponding getElementById for "filterGenre" or "filterTags" (begin ~line710) add an else if option with this structure for a genre:

  else if (genreSelect === 'placeholder') {
      document.getElementById("genreTitle").textContent="placeholder";
  genreID = ["==",["get","genre"],"placeholder"];
  }

or this for a tag:

else if (tagSelect === 'placeholder') {
  document.getElementById("tagTitle").textContent="placeholder";
tagID = ["==",["get","tag"],"placeholder"];
}


Again, replace placeholder with the chosen string.

## Focus map on a particular story location:
Within var map = new mapboxgl.Map({

Add a line with center:[-x,y], where -x,y are the co-ordinates of the chosen story. The co-ords can be copied from the JSON
