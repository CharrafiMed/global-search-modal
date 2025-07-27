<?php

namespace CharrafiMed\GlobalSearchModal\Utils;

class Highlighter
{
    // Türkçe büyük-küçük harf uyumlu, arama için normalize fonksiyonu
    protected static function turkishToLower(string $str): string
    {
        $search  = ['I', 'İ'];
        $replace = ['ı', 'i'];
        $str = str_replace($search, $replace, $str);
        return mb_strtolower($str, 'UTF-8');
    }

    public static function make(?string $text, ?string $pattern, ?string $styles = '', ?string $classes = '')
    {
        if (blank($pattern) || blank($text)) return $text;

        $dom = new \DOMDocument();
        @$dom->loadHTML(mb_convert_encoding($text, 'HTML-ENTITIES', 'UTF-8'));
        $xpath = new \DOMXPath($dom);
        $textNodes = $xpath->query('//text()');

        // Pattern ve metin için normalize edilmiş halleri
        $patternLower = self::turkishToLower($pattern);

        foreach ($textNodes as $node) {
            $content = $node->nodeValue;
            $contentLower = self::turkishToLower($content);

            $offset = 0;
            $newContent = '';

            while (($pos = mb_strpos($contentLower, $patternLower, $offset, 'UTF-8')) !== false) {
                // Orijinal metinde pozisyonu kullanıyoruz, ama arama normalize edilmişte yapılıyor

                // pattern öncesi kısmı ekle
                $newContent .= mb_substr($content, $offset, $pos - $offset);

                // Orijinal pattern kısmını al
                $matchText = mb_substr($content, $pos, mb_strlen($pattern));

                // highlight span oluştur
                $highlight = '<span';
                if (!empty($classes)) $highlight .= ' class="' . $classes . '"';
                if (!empty($styles)) $highlight .= ' style="' . $styles . '"';
                $highlight .= '>' . $matchText . '</span>';

                $newContent .= $highlight;

                $offset = $pos + mb_strlen($pattern);
            }

            // Kalan metni ekle
            $newContent .= mb_substr($content, $offset);

            if ($newContent !== $content) {
                $fragment = $dom->createDocumentFragment();
                $fragment->appendXML($newContent);
                $node->parentNode->replaceChild($fragment, $node);
            }
        }

        $body = $dom->getElementsByTagName('body')->item(0);
        $result = '';
        foreach ($body->childNodes as $child) {
            $result .= $dom->saveHTML($child);
        }

        return $result;
    }
}
