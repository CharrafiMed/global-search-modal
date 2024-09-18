# Global Search Modal Plugin 
The Global Search Modal is a powerful and customizable global search plugin for Filament inspired by the Algolia search modal, enhancing the default search functionality with features like keeping track  of favorites, recent searches for each panel you have in your filament app, and highlighting.

## Features
- [x] Powerful modal 
- [x] Inherent Filament design standards
- [x] Track recent searches  
- [x] Track favorite searches
- [x] Highlight search queries
- [x] Custom views for empty queries, footer, and not-found results
- [x] Configure Tree view for search items
- [ ] Search Suggestions
- [ ] Custom Query Builder
- [ ] Render Hook 

## Screenshots
### active search example
#### Light Mode 
![image](https://github.com/user-attachments/assets/7b21d829-1eca-41bb-acfb-b068e81f7d0a)
#### Dark Mode 
![image](https://github.com/user-attachments/assets/6a49d795-6c71-4e4c-a6f9-04ce212a8086)


### empty query string 
#### Light Mode 
![image](https://github.com/user-attachments/assets/ce9b0d03-b5b7-4bdc-be53-1893d83769a5)
#### Dark Mode
![image](https://github.com/user-attachments/assets/7cbf9851-4791-4a87-9172-f82ec8817235)
#### when filament's gray sets to slate for example : 
![image](https://github.com/user-attachments/assets/41a6b305-a38c-4883-a7b5-3ed264da888d)


## Requirement

Filament v3.2.93 or later is required due to this [pull request](https://github.com/filamentphp/filament/pull/13321).

## Installation
Follow these steps to install the Global Search Modal Plugin in your Filament app:

This guide provides detailed instructions on installing and using this plugin. Should you have any inquiries, encounter a bug, require support, or wish to submit a feature request, please do not hesitate to contact me at charrafimedfilament@gmail.com


```bash
    composer require charrafimed/global-search-modal
```

## Configuring
### plugin per panel 

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
        ])
}
```
that's it, if you have global search enabled in your panel, so you have a fully featured experience   
## Customize modal behaviors

###  Close by escaping : 
by default this plugin comes with close-by escaping enabled, if  you want to  customize the close-by escaping behavior you can do it like so : 
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->closeByEscaping(enabled: false)
        ])
}
```
###  Close by clicking away :
by default this plugin comes with a modal that can close by clicking away enabled, if  you want to  customize the close by clicky away behavior you can do it like so : 
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->closeByClickingAway(enabled: false)
        ])
}
```
###  Close button 
By default, the plugin does not include a close button. To add a close button:

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->closeButton(enabled: true)
        ])
}
```

###  Swappable on mobile
To  disable swiping to close on mobile:


```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->SwappableOnMobile(enabled: false)
        ])
}
```
### Modal slide over 
by default this plugin comes with a modal centered to the center, however, if  you want to make this modal slide over, you can do it like so : 
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->slideOver()
        ])
}
```
### max width 
by default this plugin comes with a modal of max-width 2xl (corresponding to tailwind standard), however, if  you want to customize the  modal max-width, you can do it like so :
you can use the filament core `maxWidth` Enums under namespace ``Filament\Support\Enums\MaxWidth`` 
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use Filament\Support\Enums\MaxWidth;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->maxWidth(MaxWidth::TwoExtraLarge) // for example 
        ])
}
```


    available options are :
        - ExtraSmall
        - Small
        - Medium
        - Large
        - ExtraLarge
        - TwoExtraLarge
        - ThreeExtraLarge
        - FourExtraLarge
        - FiveExtraLarge
        ...
### modal position 
The Global Search Modal Plugin allows you to customize the modal's position using the `position` method. You can define the position of the modal by specifying the top, right, left, right, left, and bottom values. The method supports two formats for specifying the position: numeric values with units and strings with units.

#### Example: Customizing the Position

To customize the modal's position, use the `position` method within the `GlobalSearchModalPlugin` instance. You can specify the top and bottom values using the `top` and `right` methods, respectively. The two supported formats are:
1. **Numeric Values with Units**: Specify the position using a numeric value followed by a unit (e.g., `100, 'px'`).
2. **String with Units**: Specify the position directly as a string (e.g., `"30px"`).
#### Usage Example

Here is an example of how to customize the modal's position:
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use CharrafiMed\GlobalSearchModal\Customization\Position;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
        GlobalSearchModalPlugin::make()
            ->position(
                fn (Position $position) => $position
                    ->top(100, 'px')     // Numeric value with unit
                    ->right('30rem')     // String with unit
            )
    ]);
}
```
Both formats are supported, and you can use them interchangeably based on your preference.

**Tip**: This method uses native CSS styling, so you can use any CSS unit with any float value.

## highlight : 
You can enable or disable the highlighting of query matches using the `->highlighter()` method. By default, highlighting is enabled.
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->highlighter(false) // disable highlighting
        ]);
}
```
### Passing Styles
To customize the styles for the highlighted text, you can use the highlightQueryStyles method. This method accepts a string or an array of styles.

#### Example With Array:
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->highlightQueryStyles([
                    'background-color' => 'yellow',
                    'font-weight' => 'bold',
                ])
        ]);
}
```
#### Example With Raw String:

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                    ->highlightQueryStyles('background-color: yellow; font-weight: bold;') // Custom styles

        ]);
}
```

## local storage    
The Global Search Modal plugin includes functionalities for interacting with local storage. This allows the plugin to retain recent searches, and favorite searches, and organize search items into groups. Below are the methods provided by the `CanInteractWithLocalStorage` trait and how to use them.
### Maximum Items Allowed
by default it keeps track of 10 items of favorites and 10 of recent, You can set the maximum number of items allowed in the local storage using the `localStorageMaxItemsAllowed` method. This method accepts an integer.
**Notice** If you set 8 for example it will allow 8 items in local storage and keep track of 8 recent search  

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->localStorageMaxItemsAllowed(20) // sets maximum items to 50
        ]);
}
```
### Retain Recent Searches if Favorited

You can enable or disable the retention of recent searches if they are also marked as favorites using the RetainRecentIfFavorite method.
in other words, if try to mark a recent to favorites it will removed from the recent.
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->RetainRecentIfFavorite(true) // enables retention of recent searches if they are favorites
        ]);
}
```
### Associate Items with Their Groups
You can enable the association of items with their groups using the associateItemsWithTheirGroups method.
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->associateItemsWithTheirGroups() // enables association of items with groups
        ]);
}

```
### animations 
This plugin uses the [alpine-animation](https://github.com/CharrafiMed/alpine-animation) package to provide seamless DOM changes,If you find this plugin helpful, please consider giving it a ⭐ on [GitHub](https://github.com/CharrafiMed/alpine-animation)!
.
## Custom Views
The Global Search Modal plugin provides several customization options for views, allowing you to create a more personalized search experience. Below are the methods provided by the Plugin and how to use them.

### Enable Footer Views

You can remove the footer view using the `keepFooterView` method.

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ...
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->keepFooterView(false) // Enables the footer view
        ]);
}
```
### Custom Footer View

You can set a custom footer view using the footerView method. This method accepts a view instance
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use Illuminate\Support\Facades\View;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->footerView(View::make('custom-footer-view')) // or the view helper method view 
        ]);
}
```
it will look under resources/views by default, if you want to use custom namespace u can specify the suffix like so :
```php
GlobalSearchModalPlugin::make()
                ->footerView(View::make('namespace::custom-footer-view'))
```
### Custom Not Found View
You can set a custom view for when no search results are found using the notFoundResultsView method.

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use Illuminate\Support\Facades\View;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->notFoundResultsView(View::make('custom-not-found-view'))
        ]);
}
```
### Custom Empty Query View

You can set a custom view for when the search query is empty using the `emptyQueryView` method.
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
use Illuminate\Support\Facades\View;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->emptyQueryView(View::make('custom-empty-query-view')) // Sets a custom empty query view
        ]);
}
```
## Placeholder 
You can customize the placeholder text for the search input using the `placeholder` method provided by the plugin
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->placeholder('Type to search...')      
        ]);
}
```

## Search Item Tree Icon 
You can configure whether the search results are displayed with a tree icon in left or not. The following example shows how to enable or disable this feature.

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->searchItemTree(false)
        ]);
}
```
## Expanded Url Target
You can configure whether the results area is fully clickable or limited to just the title area. The following example demonstrates how to enable or disable this feature.
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->expandedUrlTarget(enabled: true)
        ]);
}

```
## Accesibility
coming soon  
