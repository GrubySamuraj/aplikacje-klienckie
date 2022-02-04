import java.util.ArrayList;

public class zadanie3 {
    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>();
        items.add("a");
        items.add("b");
        items.add("c");
        System.out.println(items);
        System.out.println(items.get(0));
        ArrayList<Integer> items2 = new ArrayList<>();
        items2.add(1);
        items2.add(2);
        items2.add(3);
        items2.remove(0);
        for(int i = 0;i<items2.size();i++){
            System.out.println(items2.get(i));
        }
        System.out.println(items2);
        System.out.println(items2.get(0));
    }
}
