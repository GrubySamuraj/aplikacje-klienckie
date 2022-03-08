public class Stringi {
//      - wypisz elementy na literę k (użyj for-a , if-a i funkcji tekstowych)
//      - policz ilość elementów na literę k (użyj for-a , if-a i funkcji tekstowych)
//      - policz ilość elementów o długości większej od 4 i wypisz  (użyj for-a , if-a i funkcji tekstowych)
//      - wypisz elementy dłuższe niż 5 znaków (użyj for-a , ifa i funkcji tekstowych)
    public static void main(String[] args) {
        int ile = 0;
        int ile2 = 0;
        String[] tablica3 = {"koty","psy","owoce","grzyby","samochody","kanarki"};
        for (int x = 0;x < tablica3.length;x++){
            if(tablica3[x].charAt(0) == 'k'){
                System.out.println("Elementy na litere k: " + tablica3[x]);
                ile++;
            }
            if(tablica3[x].length() > 4){
                System.out.println("Elementy na o długości większej niż 4: " + tablica3[x]);
                ile2++;
            }
        }
        System.out.println("Ilośc elementów na literę k: "+ ile);
        System.out.println("Elementy na o długości większej niż 4: "+ ile2);
    }
}