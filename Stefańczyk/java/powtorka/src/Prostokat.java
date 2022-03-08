import java.util.Scanner;

public class Prostokat {
    public static void main(String[] args) {
        System.out.println("Program obliczający pole prosotkąta");
        System.out.println("Proszę podać bok a: ");
        Scanner sc = new Scanner(System.in);
        double a = Double.parseDouble(sc.nextLine());
        System.out.println("Podaj bok b: ");
        double b = Double.parseDouble(sc.nextLine());
        double pole = a * b;
        System.out.println("Pole prostokąta o boku a = "+ a +" i boku b = "+b+" wynosi pole: " + pole);
    }
}
