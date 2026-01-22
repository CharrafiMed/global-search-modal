# Global Search Modal Plugin
The Global Search Modal is a powerful and customizable global search plugin for Filament inspired by the Algolia search modal, enhancing the default search functionality with features like keeping track  of favorites, recent searches for each panel you have in your filament app, and highlighting.

[![Total Downloads](https://img.shields.io/packagist/dt/charrafimed/global-search-modal?style=for-the-badge)](https://packagist.org/packages/charrafimed/global-search-modal)
[![Latest Version](https://img.shields.io/packagist/v/charrafimed/global-search-modal?style=for-the-badge)](https://packagist.org/packages/charrafimed/global-search-modal)

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

## Full Docs
refer to it's  [official documentation website ](https://convergephp.com/plugins/gsm/docs/overview)

documentations markdown: https://github.com/CharrafiMed/gsm-docs
## Requirement

Filament v4 or v5.

## Installation
Follow these steps to install the Global Search Modal Plugin in your Filament app:



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
