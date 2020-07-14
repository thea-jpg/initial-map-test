# read me
Combined filters:
Ensure the property is in the JSON as either a tag or a genre.
Add a radio toggle in the appropriate id="filterGenre" or id="filterTags" div, replacing 'placeholder' with the chosen string.
The radio button should follow this structure:	<input id='placeholder' type='radio' name='toggle' value='placeholder'>
  <label for='placeholder'>placeholder</label>

  In the corresponding getElementById for "filterGenre" or "filterTags" add an else if option with this structure:

  else if (genreSelect === 'placeholder') {
  genreID = ["==",["get","genre"],"placeholder"];
  }
  or
  else if (tagSelect === 'placeholder') {
  tagID = ["==",["get","tag"],"placeholder"];
  }

Again, replace placeholder with the chosen string.
