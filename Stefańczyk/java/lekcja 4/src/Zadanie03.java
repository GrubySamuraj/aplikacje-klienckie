import java.util.Scanner;


class Zadanie03{

    public static void main(String[] args) {
        Trojmian trojmian = new Trojmian();
        trojmian.read();
        trojmian.calculate();
        trojmian.display();
    }

    static class Trojmian {

        double a = 0.0;
        double b = 0.0;
        double c = 0.0;
        double delta = 0.0;
        double x1 = 0.0;
        double x2 = 0.0;

        void read() {
            System.out.println("Program oblicza pole prostokąta.");
            System.out.println("Podaj a.");
            Scanner s = new Scanner(System.in);
            a = s.nextDouble();
            System.out.println("Podaj b.");
            b = s.nextDouble();
            System.out.println("Podaj c.");
            c = s.nextDouble();
        }

        void calculate() {
            delta = (Math.pow(b,2) - 4 * a * c);
            if(delta > 0) {
                x1 = ((-b - Math.sqrt(delta)) / 2 * a);
                x2 = ((-b + Math.sqrt(delta)) / 2 * a);
            }
            else if(delta == 0){
                x1 = (-b / 2 * a);
            }
            else{

            }
        }

        void display() {
            if(a!=0) {
                if (delta > 0) {
                    System.out.println("x1 jest równy: ");
                    System.out.println(x1);
                    System.out.println("x2 jest równy: ");
                    System.out.println(x2);
                } else if (delta == 0) {
                    System.out.println("x1 jest równy: ");
                    System.out.println(x1);
                } else {
                    System.out.println("Nie ma pierwiastków");
                }
            }
            else{
                System.out.println("a nie moze byc rowne 0");
            }
        }
    }
}
