<?php

namespace CharrafiMed\GlobalSearchModal;



function format_styles(array | string | null $styles)
{
    if (is_null($styles)) {
        return;
    }
    
    if (is_array($styles)) {
        $styleString = '';
        foreach ($styles as $key => $value) {
            $styleString .= $key . ':' . $value . ';';
        }
        return $styleString;
    }
    return $styles;
}
