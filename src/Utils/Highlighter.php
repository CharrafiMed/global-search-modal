<?php
namespace CharrafiMed\GlobalSearchModal\Utils;

class Highlighter
{
    public static function make(?string $text, ?string $pattern, ?string $styles = '', ?string $classes = '')
    {
        if (blank($pattern)) return $text;

        $highlightedPattern = '<span';

        if (!empty($classes)) {
            $highlightedPattern .= ' class="' . $classes . '"';
        }

        if (!empty($styles)) {
            $highlightedPattern .= ' style="' . $styles . '"';
        }

        $highlightedPattern .= '>$0</span>';

        return preg_replace('/(' . preg_quote($pattern, '/') . ')/i', $highlightedPattern, $text);
    }

    // 
    // public static function makeKmp(?string $text, ?string $pattern, ?string $styles = '', ?string $classes = '')
    // {
    //     if (blank($pattern)) return $text;

    //     $matches = KMP::search($text, $pattern);

    //     $highlightedText = "";
        
    //     $lastIndex = 0;

    //     $queryLength = strlen($pattern);

    //     foreach ($matches as $matchIndex) {
    //         $highlightedText .= substr($text, $lastIndex, $matchIndex - $lastIndex);

    //         // Start the <span> tag
    //         $highlightedText .= '<span';

    //         // Conditionally add the class attribute if not empty
    //         if (!empty($classes)) {
    //             $highlightedText .= ' class="' . $classes . '"';
    //         }

    //         // Conditionally add the style attribute if not empty
    //         if (!empty($styles)) {
    //             $highlightedText .= ' style="' . $styles . '"';
    //         }

    //         // Close the opening <span> tag and add the highlighted text
    //         $highlightedText .= '>' . substr($text, $matchIndex, $queryLength) . '</span>';

    //         $lastIndex = $matchIndex + $queryLength;
    //     }

    //     $highlightedText .= substr($text, $lastIndex);
    //     return $highlightedText;
    // }
}
