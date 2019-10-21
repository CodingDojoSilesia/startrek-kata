# Star Trek _Kata_

The english version of the following instruction ca be found [here](README_EN.md).

Niniejsza _Kata_ jest silnie inspirowana grą konsolową Apple Star-Trek stworzoną przez Roberta J. Bishopa w 1977 roku w Basicu. W grze **sterujemy** statkiem gwiezdnej floty o nazwie _Enterprise_, którego zadaniem jest zniszczenie **wrogich okrętów Klingonów**. Aby lepiej wyobrazić sobie jak wygląda rozgrywka, zobacz (to wideo)[https://www.youtube.com/watch?v=e6f9_9kzuzk].

## Opis problemu

Statek _Enterprise_ porusza się w galaktyce podzielonej na **64 kwadranty** ułożone na siatce 8x8 pól. Każdy kwadrant składa się z **64 sektorów**, również ułożonych na siatce 8x8 pól. Kwadrant _0,0_ jest położony w lewym dolnym rogu galaktyki, z kolei kwadrant _7,7_ znajduje się w prawym górnym rogu galaktyki (sektory w kwadrantach są ułożone analogicznie). Nie ma możliwości opuszczenia galaktyki poza wskazany zakres.

Po całej galaktyce w sposób losowy rozrzuconych jest **7 statków Klingonów** oraz **2 bazy gwiezdnej floty**, w których gracz może uzupełnić zapasy. W galaktyce znajduje się również losowa liczba **gwiazd**. Zniszczenie wszystkich jednostek Klingonów oznacza zwycięstwo gracza.

Początkowo, gracz ma do dyspozycji **15 dat gwiezdnych** oraz **600 jednostek energii** (maksymalny poziom energii).

Rozgrywka odbywa się przez wpisywanie komend do komputera pokładowego statku. Gracz ma do dyspozycji aż **5 komend**, które numerowane są **od 0 do 4**. Przed wyświetleniem prośby o komendę komputer powinien wyswietlić status _Enterprise_, tzn. ilość zapasów energii, jego pozycję i liczbę pozostałych dat gwiezdnych.

### Manewrowanie _Enterprise_

Za pomocą komendy `0` gracz przemieszcza _Enterprise_. Po wpisaniu tego polecenia komputer powinien odpowiedzieć graczowi `VECTOR ?`, co oznacza prośbę o podanie liczby sektorów w poziomie i pionie, o którą zostanie przesunięty statek. Dla przykładu: `-21,35` oznaczu ruch o 21 sektorów w lewo i 35 do góry.

Przemieszczanie statku zużywa energię zgodnie z metryką miasto (tj. sumę wartości bezwględnych różnic współrzędnych). Dodatkowo, przejście z jednego kwadrantu do drugiego zużywa jedną datę gwiezdną. Gdy nie mamy już do dyspozycji dat gwieznych a poza kwadrantem, w którym obecnie znajduje się statek są jeszcze aktywne statki Klingonów to gracz przegrywa grę.

Jeżeli po przesunięciu statek znajduje się w tej samej pozycji jak inny obiekt (tj. statek Klingonów, baza gwiezdnej floty lub gwiazda) gra kończy się przez zniszczenie statku.

Za każdym razem kiedy wchodzimy w kwadrant, pozycja wszytkich elementów w nim się znajdujących ulega losowej zmianie. To oznacza, że po powrocie do odwiedzonego wcześniej kwadrantu, liczba statków Klingonów, baz oraz gwiazd będzie taka sama, ale zmieni się ich pozycja.

Jeżeli ruch _Enterprise_ zakończy się w jednym z czterech sektorów będących w bezpośrednim sąsiedzctwie bazy floty gwiezdnej (sektory przylegające od góry, dołu, lewa i prawa) zapas posiadanej energii zostanie uzupełniony do maksimum.

### Skanowanie galaktyki

Komenda `1` wykonuje krótki skan wyświetlający kwadrant, w którym aktualnie znajduje się statek. _Enterprise_ oznaczony jest przez symbol `<*>`, statki Klingonów reprezentowane są przez symbol `+++`, bazy gwiezdnej floty przez `>!<`, a gwiazdy przez ` * `.

Komenda `2` wykonuje skan dalekiego zasięgu, który pokazuje najbliższe 3x3 kwadrantów względem obszaru, w którym aktualnie znajduje się _Enterprise_. Wynik skanowania jest wyświetlany w nastepującej formie: `KBS`, gdzie `K` to liczba statków Klingonów, `B` to liczba baz gwiezdnej floty a `S` to liczba gwiazd w danym kwadrancie.

### Walka z Klingonami

Za każdym razem, kiedy ruch statku zakończy się w kwadrancie, w którym znajdują się Klingoni, rozpoczną oni ostrzał statku. Otrzymane obrażenia są automatycznie pochłaniane przez tarczę, której utrzymanie kosztuje równowartość obrażeń w energii. Gdy energia statku spadnie do zera wówczas gracz przegrywa grę.

Wpisując komendę `3` gracz przechodzi w tryb walki, komputer informuje go o ilości energii, którą posiada i prosi o wskazanie ile energii przeznaczyć na ostrzał najbliższego wg. metryki miasto statku Klingonów. Wpisanie _0_ powoduje powrót do zwykłego trybu komend. W przypadku gdy okręt Klingonów nie jest zniszczony (tj. ma 0 energii) ostrzeliwuje on ponownie _Enterprise_ (tu również działa opisana wyżej mechanika tarcz).

Każdy ostrzał w grze (zarówno gracza i Klingonów) ma ryzyko chybienia. Prawdopodobieństwo trafienia wyliczane jest wg następującego wzoru: `5 / ({wartość metryki miasto pomiędzy obiektami} + 4)`.

### Mapa galaktyki

Komenda `4` wyświetla mapę galaktyki uwzględniającą wszystkie poprzednie wyniki skanów dalekiego zasięgu.

## Stopnie zaawansowania

Podobnie jak w poprzednim zadaniu niniejsza _Kata_ ma trzy poziomy zaawansowania:
- _junior_ implementacja komend `0` i `1` bez losowości w układzie sektorów,
- _mid_ implementacja komend `2` i `4` i dodanie losowości do gry,
- _senior_ implementacja komendy `3` i walki z Klingonami.

## Źródło

Orginalny opis gry: [https://www.applefritter.com/content/star-trek-8k-apple-i-basic](https://www.applefritter.com/content/star-trek-8k-apple-i-basic).
