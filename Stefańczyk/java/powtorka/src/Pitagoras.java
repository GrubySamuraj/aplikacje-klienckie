import java.util.Scanner;

public class Pitagoras {
    public static void main(String[] args) {
        try{
            System.out.println("Proszę podać liczbę a:");
            Scanner sc = new Scanner(System.in);
            int a = Integer.parseInt(sc.nextLine());
            System.out.println("Proszę podać liczbę b:");
            int b = Integer.parseInt(sc.nextLine());
            System.out.println("Proszę podać liczbę b:");
            int c = Integer.parseInt(sc.nextLine());
            if(a>0 && b>0 && c>0){
                if(Math.pow(a,2) + Math.pow(b,2) == Math.pow(c,2)){
                    System.out.println("Jest to trójkąt prostokątny");
                }
                else{
                    System.out.println("Nie jest to trójkąt prostokątny");
                }
            }
            else{
                System.out.println("Proszę podać liczby większe od 0!");
            }
        }
        catch (NumberFormatException e){
            System.out.println("Podaj liczby całkowite!");
        }
    }
}
