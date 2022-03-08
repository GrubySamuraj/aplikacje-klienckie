import java.util.ArrayList;
import java.util.Scanner;

public class Zadanie06 {
    public static void main(String[] args) {
        System.out.println("ODWRACANIE");
        System.out.println("podaj dowolny ciąg znaków: ");
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine();
        String odwrocone = "";
        ArrayList<Character> text2 = new ArrayList<>();
        for (int x = 0; x < text.length();x++){
            text2.add(text.charAt(text.length() -1 - x));
        }
        for (int y = 0; y < text2.size(); y++){
            odwrocone+=text2.get(y);
        }
        System.out.println("odwrócone: \n" + odwrocone);
        System.out.println("znów odwrócone: \n" + text);

    }
}
