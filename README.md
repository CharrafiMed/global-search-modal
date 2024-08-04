# Global Search Modal Plugin 
The Global Search Modal is a powerful and customizable global search plugin for Filament inspired by algolia search modals , enhancing the default search functionality with features like keep track  favorites, recent searches for each panels you have in your filament app , and highlighting.
##features

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
## Installation
Follow these steps to install the Global Search Modal Plugin in your Filament app:
# Installation

Thank you for purchasing Advanced Tables!

This guide provides detailed instructions on installing and using this plugin. Should you have any inquiries, encounter a bug, require support, or wish to submit a feature request, please do not hesitate to contact me at charrafimedfilament@gmail.com

## Activating Your License on AnyStack
 AnyStack to handle payment, licensing, and distribution for this global search modal .

During the purchasing process, AnyStack will provide you with a license key. You will also be asked by AnyStack to activate your license by providing a domain. This is usually the domain where your final project will be hosted. You’ll use this same domain to install locally and in production. Once you have provided a domain, your license key will be activated, and you can proceed with installing with Composer below.

**Tip:** If you missed this step or need to add additional domains for other projects, you can access the activation page by going to Transactions in your AnyStack account and then clicking View details on the Advanced Tables product.

**Tip:** You will need both your license key and your domain to authenticate when you install the package with Composer.

## Installing with Composer

To install Global Search Modal , add the package to your `composer.json` file:

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
Once the repository has been added to your composer.json file, you can install global search modal like any other composer package using the composer require command

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
## configuring plugin per panel 

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
that's it, if you have global search enabled in your panel, so you have fully featured experience   
## customize modal behaviors

###  close by escaping : 
by default this plugin cames with close by escaping enabled,howeverif  you want to  customize the close by escaping behavior you can do it like so : 
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
by default this plugin cames with modal can close by clicking away enabled, howeverif  you want to  customize the close by escaping behavior you can do it like so : 
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
by default this plugin cames with modal does not has close button enabled, however if  you want to customize this feature you can do it like so : 
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

###  swappable on mobile
by default this plugin cames with modal does not has close button enabled, however if  you want to customize this feature you can do it like so : 
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

    - close by clicking away 
    - close button 
    - swippable on mobile
    - slide over version 
    - customize max width 
    - position 
    - overlay classes


## highlight : 
    - enabling
    - pass styles
    - pass classes 
## local storage    
    - max items allowed 
    - active favorites search enabling 
    - active recent search enabling 
    - retains recent if favorites 
    -  associate items with thier groups 
## custom views 
    - enable footer views 
    - custom footer 
    - custom not found view 
    - empty query view 
## accesibilty 
    - aria
## background color
    - styles 
## place holder 
    - input place holder
## search item tree
    - has or not 
## search suggestion [todo]
## custom query [todo]
## render hooks [todo]
## add tailwind classes in run time 
## design builder [todo60/100]
