<?php

namespace CharrafiMed\GlobalSearchModal\Utils;


class highlighter
{

    public static function make(?string $text, ?string $pattern, ?string $styles = '', ?string $classes = '')
    {
        if (blank($pattern)) return $text;

        $matches = KMP::search($text, $pattern);

        $highlightedText = "";
        $lastIndex = 0;
        $queryLength = strlen($pattern);

        foreach ($matches as $matchIndex) {
            $highlightedText .= substr($text, $lastIndex, $matchIndex - $lastIndex);
            $highlightedText .=
                '<span 
                    class="' . $classes . '" 
                    style="' . $styles . '"
                >' .
                substr($text, $matchIndex, $queryLength)
                . '</span>';
            $lastIndex = $matchIndex + $queryLength;
        }

        $highlightedText .= substr($text, $lastIndex);
        return $highlightedText;
    }
}
