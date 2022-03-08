import java.util.Scanner;

public class Kalk {
    public static void main(String[] args) {
        try {
            System.out.println("Proszę podać pierwszą liczbę x: ");
            Scanner sc = new Scanner(System.in);
            double x = Double.parseDouble(sc.nextLine());
            System.out.println("Proszę podać pierwszą liczbę x: ");
            double y = Double.parseDouble(sc.nextLine());
            double suma = x + y;
            double roznica = x - y;
            double Iloczyn = x * y;
            double Iloraz = x / y;
            System.out.println("Dla liczb x: "+x+" y: " + y + " Suma: " + suma + "Różnica: " + roznica + "iloczyn: " + Iloczyn + "Iloraz" + Iloraz);

        } catch (NumberFormatException e) {
            System.out.println ("Nie wczytano liczby lub błędny format. Koniec programu.");
        }
    }
}
