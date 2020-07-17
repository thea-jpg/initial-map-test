# read me
Combined filters:
Ensure the property is in the JSON as either a tag or a genre.
Add a radio toggle in the appropriate id="filterGenre" or id="filterTags" ul, replacing 'placeholder' with the chosen string.
The radio button should follow this structure
<li>
    <label>
      <input id='poetry' type='radio' name='toggle' value='poetry'>
      poetry
    </label>
  </li>

In the corresponding getElementById for "filterGenre" or "filterTags" (begin line710) add an else if option with this structure for a genre:

  else if (genreSelect === 'placeholder') {
  genreID = ["==",["get","genre"],"placeholder"];
  }

or this for a tag:

  else if (tagSelect === 'placeholder') {
  tagID = ["==",["get","tag"],"placeholder"];
  }

Again, replace placeholder with the chosen string.
