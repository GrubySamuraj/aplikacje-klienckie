import java.util.Scanner;

public class Rek_silnia {
    public static void main(String[] args) {
        System.out.println("Obliczanie silni dla dowolnej liczby całkowitej.");
        System.out.println("Podaj n: ");
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine());

        Silnia s = new Silnia();
        System.out.println(s.liczSilnie(n));
    }
    static class Silnia {

        public Silnia(){
        }
        private int liczSilnie(int n){
            if(n<2) {
                return 1;
            }else{
                return n * this.liczSilnie(n - 1);
            }
        }
    }
}
