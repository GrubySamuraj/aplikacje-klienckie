import java.util.ArrayList;

public class Diament {
    public static void main(String[] args) {
//        System.out.println(printDiament('C'));
        printDiament('D');
    }
    static void printDiament(char litera){
        String str = "";
        ArrayList<String> strings = new ArrayList<>();
        ArrayList<Character> alfabet= new ArrayList<>(){{add('A'); add('B'); add('C'); add('D'); add('E'); add('F');add('G'); add('H'); add('I'); add('J'); add('K'); add('L');}};
        int len = 2*alfabet.indexOf(litera) + 1;
        int sr1 = len/2;
        int sr2 = len/2;
        int inc1 = 1;
        int inc2 = -1;
        int pom = 0;
        int pom2 = 0;
        for (int x = 0; x < len;x++){
            str="";
            for (int y = 0; y < len;y++) {
                if((x==sr1 || y==sr1) || (x==sr2 || y==sr2)) {
                    str += alfabet.get(pom2);
                }
                else
                    str+=".";
            }
            strings.add(str);
            sr1+=inc1;
            sr2+=inc2;
            pom2+=inc1;
            if(sr2 == 0){
                pom = inc2;
                inc2 = inc1;
                inc1 = pom;
            }

        }
        for(int x = 0; x < strings.size(); x++){
            System.out.println(strings.get(x));
        }
    }
}

//                if (i<len) {
//        character = String.valueOf(alabet.charAt(i));
//        var1 = (len -1) - i;
//        var2 = (len -1) + i;
//        } else  {
//        rev +=2;
//        character = String.valueOf(alabet.charAt(i-rev));
//        var1 = (len -1) - (i - rev);
//        var2 = (len -1) + (i - rev);
//        }

//                if(x == y + alfabet.indexOf(litera) - x || y == x + alfabet.indexOf(litera) + y || x == y - alfabet.indexOf(litera) + y|| y == - x - alfabet.indexOf(litera)){
//                        str += alfabet.get(x);
//                        }
//                        else {
//                        str += ".";
//                        }