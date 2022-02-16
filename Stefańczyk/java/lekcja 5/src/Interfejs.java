public class Interfejs {
    public static void main(String[] args) {
        Document doc = new Document();
        doc.print();
        doc.cancel();
    }
    static class Document implements Printable{

        @Override
        public void print() {

        }

        @Override
        public void cancel() {

        }
    }
    interface Printable {
        void print();
        void cancel();
    }
}
