<?php
namespace CharrafiMed\GlobalSearchModal\Utils;

class Highlighter
{
    public static function make(?string $text, ?string $pattern, ?string $styles = '', ?string $classes = '')
    {
        if (blank($pattern)) return $text;

        $highlightedPattern = '<span';

        if(!empty($classes)) {
            $highlightedPattern .= ' class="' . $classes . '"';
        }

        if (!empty($styles)) {
            $highlightedPattern .= ' style="' . $styles . '"';
        }

        $highlightedPattern .= '>$0</span>';

        $quoted = preg_quote($pattern, '/');

        // The u modifier lets i fold non-ASCII letters (Cyrillic, Greek, accents). It makes
        // preg_replace return null on invalid UTF-8, so fall back to the byte-wise match then.
        return preg_replace('/(' . $quoted . ')/iu', $highlightedPattern, $text)
            ?? preg_replace('/(' . $quoted . ')/i', $highlightedPattern, $text);
    }
}
