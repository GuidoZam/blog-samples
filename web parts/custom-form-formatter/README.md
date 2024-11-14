# custom-form-formatter

## Summary

This web part is used to demonstrate how to use the custom formatters in the SharePoint Framework.
It provides a button that apply a custom formatting to a specific content type.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0--beta.0-yellow.svg)

## Formatters

The web part allows to specify a custom form formatter for each of the form sections.

### Header formatter

The header formatter is used to customize the header of the form. It is a JSON object that contains the elements to be displayed in the header.

```JSON
{
  "elmType": "div",
  "txtContent": "Hey there! This is a custom header!"
}
```

### Body formatter

The body formatter is used to customize the body of the form. It is a JSON object that contains the elements to be displayed in the body.
The fields property contains the internal names of the fields to be displayed in the form.

```JSON
{
  "sections": [
    {
      "displayname": "First section",
      "fields": [
        "Title"
      ]
    },
    {
      "displayname": "Second section",
      "fields": [
          "StartDate"
       ]
    }
  ]
}
```

### Footer formatter

The footer formatter is used to customize the footer of the form. It is a JSON object that contains the elements to be displayed in the footer.

```JSON
{
  "elmType": "div",
  "txtContent": "Hey there! This is a custom footer!"
}
```
