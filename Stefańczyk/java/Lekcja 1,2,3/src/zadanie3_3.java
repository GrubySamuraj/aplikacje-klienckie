import java.util.Scanner;

public class zadanie3_3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Podaj słowo: ");
        String input = sc.nextLine();
        System.out.println(Odwroc(input));
    }
    public static String Odwroc(String input){
        String odwrocone = "";
        for(int x = input.length() - 1; x >= 0; x--){
            System.out.println(input.charAt(x));
            odwrocone += input.charAt(x);
        }
        return odwrocone;
    }
}
