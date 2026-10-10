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

        // Match either a whole HTML tag or the search term. Tags are returned
        // unchanged, so a term that also appears inside markup (for example
        // "div" in <div>) never corrupts the HTML. The u modifier lets i fold
        // non-ASCII letters (Cyrillic, Greek, accents); on invalid UTF-8 the
        // callback returns null, so fall back to the byte-wise match then.
        $re = '/(<[^>]*>)|(' . $quoted . ')/i';
        $callback = function ($m) use ($highlightedPattern) {
            if (!empty($m[1])) return $m[1];
            return str_replace('$0', $m[2], $highlightedPattern);
        };
        $result = preg_replace_callback($re . 'u', $callback, $text);
        if ($result === null) {
            $result = preg_replace_callback($re, $callback, $text);
        }
        return $result;
    }
}
