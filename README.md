# Global Search Modal Plugin 
The Global Search Modal is a powerful and customizable global search plugin for Filament inspired by the Algolia search modal, enhancing the default search functionality with features like keeping track  of favorites, recent searches for each panel you have in your filament app, and highlighting.

## Features
- [x] Powerful modal 
- [x] Inherent Filament design standards
- [x] Track recent searches  
- [x] Track favorite searches
- [x] Highlight search queries
- [x] Custom views for empty queries, footer, and not-found results
- [x] Tree view for search items
- [ ] search suggestions
- [ ] Custom Query Builder
## ScreenShots
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



## Installation
Follow these steps to install the Global Search Modal Plugin in your Filament app:
# Installation

Thank you for purchasing Advanced Tables!

This guide provides detailed instructions on installing and using this plugin. Should you have any inquiries, encounter a bug, require support, or wish to submit a feature request, please do not hesitate to contact me at charrafimedfilament@gmail.com

## Activating Your License on AnyStack
 AnyStack to handle payment, licensing, and distribution for this global search modal.

During the purchasing process, AnyStack will provide you with a license key. You will also be asked by AnyStack to activate your license by providing a domain. This is usually the domain where your final project will be hosted. You’ll use this same domain to install locally and in production. Once you have provided a domain, your license key will be activated, and you can proceed with installing Composer below.

**Tip:** If you missed this step or need to add additional domains for other projects, you can access the activation page by going to Transactions in your AnyStack account and then clicking View details on the Advanced Tables product.

**Tip:** You will need both your license key and your domain to authenticate when you install the package with Composer.

## Installing with Composer

To install Global Search Modal, add the package to your `composer.json` file:

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://.composer.sh"
        }
    ]
}

```
Once the repository has been added to your composer.json file, you can install the global search modal like any other composer package using the composer require command

```bash
    composer require charrafimed/global-search-modal
```

During installation, you will be prompted to enter your username and password:

```
Loading composer repositories with package information
Authentication required (global-search-modal.composer.sh):
Username: [license-email]
Password: [license-key]

```

Your username is your email address, and the password should be your license key followed by a colon (:), and then the domain you are activating. For example, if your details are:
- Contact email: your_email@gmail.com
- License key: 8c21dfde-6273-4932-b4ba-8bcc723efced
- Activation fingerprint: your_domain.com


You should enter the following when prompted:

```
Loading composer repositories with package information
Authentication required (global-search-modal.composer.sh):
Username: your_email@gmail.com
Password: 8c21dfde-6273-4932-b4ba-8bcc723efced:your_domain.com
```

Ensure that the license key and domain fingerprint are separated by a colon (:).

**Tip**: If you encounter a 402 error, it's likely because the colon and domain fingerprint were not included correctly.
## Configuring
### plugin per panel 

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
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
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->closeByEscaping(enabled: false)
        ])
}
```
###  close clicking by clicking away :
by default this plugin comes with a modal that can close by clicking away enabled, if  you want to  customize the close by clicky away behavior you can do it like so : 
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->closeByClickingAway(enabled: false)
        ])
}
```
###  close button 
By default, the plugin does not include a close button. To add a close button:

```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
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
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->SwappableOnMobile(enabled: false)
        ])
}
```
### Modal slide over 
by default this plugin comes with a modal centered to the center, however if  you want to make this modal slide over, you can do it like so : 
```php
use CharrafiMed\GlobalSearchModal\GlobalSearchModalPlugin;
 
public function panel(Panel $panel): Panel
{
    return $panel
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
    public function panel(Panel $panel): Panel
{
    return $panel->plugins([
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
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->localStorageMaxItemsAllowed(20) // Sets maximum items to 50
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
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->RetainRecentIfFavorite(true) // Enables retention of recent searches if they are favorites
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
        ->plugins([
            GlobalSearchModalPlugin::make()
                ->associateItemsWithTheirGroups() // Enables association of items with groups
        ]);
}

```
    - active favorites search enabling 
    - active recent search enabling 

## custom views 
    - enable footer views 
    - custom footer 
    - custom not found view 
    - empty query view 
## accessibility 
    - aria
## background color
    - styles 
## place holder 
    - input placeholder
## search item tree
    - has or not 
## search suggestion [todo]
## custom query [todo]
## render hooks [todo]
## add tailwind classes in run time 
## design builder [todo60/100]
