# Global Search Modal Plugin 
The Global Search Modal is a powerful and customizable global search plugin for Filament, enhancing the default search functionality with features like keep track  favorites, recent searches for each panels you have in your filament app , and highlighting.
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

You will find comprehensive documentation below for installing and using this plugin. Should you have any inquiries, encounter a bug, require support, or wish to submit a feature request, please do not hesitate to contact me at charrafimedfilament@gmail.com

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

Once the repository has been added to your composer.json file, you can install Advanced Tables like any other composer package using the composer require command

```bash
    composer require charrafimed/global-search-modal
```
## configuring plugin per panel 

## customize modal behaviors

###  close by escaping 
 you can customize the close by escaping behavior like this : 
```php

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
