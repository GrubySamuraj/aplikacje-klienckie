import java.util.ArrayList;
import java.util.Scanner;

public class Zadanie07 {
    public static void main(String[] args) {
        Osoba t = new Osoba();
        t.init();
        t.display();
    }
    static class Osoba {
        private String nazwisko;
        private String miasto;
        private String kod;

        public Osoba() {
        }
        public void init(){
            System.out.println("Wprowadzanie danych");
            System.out.println("Podaj nazwisko:");
            Scanner sc = new Scanner(System.in);
            nazwisko = sc.nextLine();
            System.out.println("Podaj miasto:");
            miasto = sc.nextLine();
            System.out.println("Podaj kod pocztowy:");
            kod = sc.nextLine();
            check();
        }
        public void display(){
            System.out.println("Wyświetlenie danych: ");
            System.out.println("Nazwisko: " + nazwisko);
            System.out.println("Miasto: " + miasto);
            System.out.println("Kod: " + kod);
        }
        public void check(){
            int x = 0;
            while(kod.length() != 6){
                    Scanner sc = new Scanner(System.in);
                    System.out.println("Podaj kod pocztowy:");
                    kod = sc.nextLine();
            }
        }
    }
}
