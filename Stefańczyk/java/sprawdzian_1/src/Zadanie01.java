import java.util.Scanner;

public class Zadanie01 {
    public static void main(String[] args) {
        System.out.println("Podaj promień r.");
        Scanner sc = new Scanner(System.in);
        double r = Double.parseDouble(sc.nextLine());
        double V = (4 * Math.PI * Math.pow(r,3))/3;
        System.out.println("Objętość kuli o promieniu r = " + r + " wynosi " + V + ".");
    }
}
