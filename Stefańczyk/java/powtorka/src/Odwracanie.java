import java.lang.reflect.Array;
import java.util.Scanner;
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

public class Odwracanie {
    public static void main(String[] args) {
        System.out.println("Proszę podać stringa do odwrócenia: ");
        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        String reversed = reverse(str);
        System.out.println(reversed);
    }
    public static String reverse(String str){
        String[] list = str.split("");
        ArrayList<String> list1 = new ArrayList<>(Arrays.asList(list));
        String reversed = "";
        ArrayList<String> reversedlist = new ArrayList<>();
        for(int x = 0;x < list1.size();x++){
            reversedlist.add(list1.get(list1.size() - x - 1));
        }
        for(int x = 0; x < reversedlist.size(); x++){
            reversed+=reversedlist.get(x);
        }
        return reversed;
    }
}