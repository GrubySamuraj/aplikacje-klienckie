public class Zadanie02 {
    public static void main(String[] args) {
        int sumaparz = 0;
        int sumaniep = 0;
        for(int x = 1; x < 101;x++){
            if(x % 2 == 0){
                sumaparz += x;
            }
            else{
                sumaniep+=x;
            }
        }
        System.out.println("Program sumuje liczby parzyste od 1 do 100.");
        System.out.println("Suma liczb parzystych od 1 do 100 wynosi " + sumaparz + ".");
        System.out.println("Suma liczb nieparzystych od 1 do 100 wynosi " + sumaniep + ".");
    }
}
