Outcome: Render in standard table format for accessibility, conditional to render will be made on per cell level

Focusing on feature to selectively show columns:
    - Removing column results in re-render for every row
    - Table as series of flexboxes per column ca result in simple rendering
    - Logic will have to support indexed storage for each column data
    - Use of column felxboxes does not support screen readers

There is no call for other data sotring features
