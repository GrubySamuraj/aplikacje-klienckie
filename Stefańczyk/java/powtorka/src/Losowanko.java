import java.util.Scanner;

public class Losowanko {
    public static void main(String[] args) {
        int max = 9;
        int min = 0;
        int range = max - min + 1;

        int liczba = (int) ((Math.random() * range) + min);
        Scanner sc = new Scanner(System.in);
        System.out.println("Proszę wybrać liczę: ");
        int user = Integer.parseInt(sc.nextLine());
        System.out.println("Wylosowana liczba: " + liczba);
        while(user != liczba){
            System.out.println("Spróbuj ponownie, to nie ta liczba");
            user = Integer.parseInt(sc.nextLine());
        }
        System.out.println("Brawo udało ci się wybrać odpowiednią liczbę!");
    }
}

