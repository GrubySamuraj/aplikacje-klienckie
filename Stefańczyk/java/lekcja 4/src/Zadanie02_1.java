import java.util.Scanner;


class Zadanie02_1 {

    public static void main(String[] args) {
        Pole pole = new Pole();
        pole.read();
        pole.calculate();
        pole.display();
    }

static class Pole {

    double a = 0.0;
    double b = 0.0;
    double pole = 0.0;

    void read() {
        System.out.println("Program oblicza pole prostokąta.");
        System.out.println("Podaj a.");
        Scanner s = new Scanner(System.in);
        a = s.nextDouble();
        System.out.println("Podaj b.");
        b = s.nextDouble();
    }

    void calculate() {
        pole = a * b;
    }

    void display() {
        System.out.print("Pole prostokąta o boku a = ");
        System.out.printf("%2.2f", a);
        System.out.print(" i boku b = ");
        System.out.printf("%2.2f", b);
        System.out.print(" wynosi ");
        System.out.printf("%2.2f.\n", pole);
    }
}
}
