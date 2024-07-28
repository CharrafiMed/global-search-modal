<?php

namespace CharrafiMed\GlobalSearchModal\Utils;


class KMP
{
    public static function computeLPSArray($pattern)
    {
        $length = 0;
        $lps = array_fill(0, strlen($pattern), 0);
        $i = 1;

        while ($i < strlen($pattern)) {
            if ($pattern[$i] == $pattern[$length]) {
                $length++;
                $lps[$i] = $length;
                $i++;
            } else {
                if ($length != 0) {
                    $length = $lps[$length - 1];
                } else {
                    $lps[$i] = 0;
                    $i++;
                }
            }
        }

        return $lps;
    }

    public static function search($text, $pattern)
    {
        $matches = [];
        // Convert both text and pattern to lowercase for case-insensitive search
        $pattern = strtolower($pattern);
        $text = strtolower($text);

        $lps = self::computeLPSArray($pattern);
        $i = 0;
        $j = 0;
        $m = strlen($pattern);
        $n = strlen($text);

        while ($i < $n) {
            if ($pattern[$j] == $text[$i]) {
                $j++;
                $i++;
            }

            if ($j == $m) {
                $matches[] = $i - $j;
                $j = $lps[$j - 1];
            } else if ($i < $n && $pattern[$j] != $text[$i]) {
                if ($j != 0) {
                    $j = $lps[$j - 1];
                } else {
                    $i++;
                }
            }
        }

        return $matches;
    }
}
