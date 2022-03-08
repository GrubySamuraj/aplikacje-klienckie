import java.util.Scanner;

public class Klasa_Osoba {
    public static void main(String[] args) {
        Osoba o = new Osoba();
        o.init();
        o.display();
        o.check();
    }
    static class Osoba{
        private String nazwisko;
        private String miasto;
        private String kod;

        public Osoba(){
            this.nazwisko = nazwisko;
            this.miasto = miasto;
            this.kod = kod;
        }
        void init(){
            Scanner sc = new Scanner(System.in);
            System.out.println("Proszę podać nazwisko: ");
            this.nazwisko = sc.nextLine();
            System.out.println("Proszę podać miasto: ");
            this.miasto = sc.nextLine();
            System.out.println("Proszę podać kod pocztowy: ");
            this.kod = sc.nextLine();
        }
        void display(){
            System.out.println("Wyświetlenie danych: ");
            System.out.println("Nazwisko: "+ this.nazwisko);
            System.out.println("Miasto: " +this.miasto);
            System.out.println("Kod pocztowy: " +this.kod);
        }
        void check(){
            if(this.kod.charAt(2) == '-' && kod.length() == 6){
                System.out.println("Kod jest poprawny");
            }
            else{
                System.out.println("Kod pocztowy jest niepoprwany");
            }
        }

    }
}
