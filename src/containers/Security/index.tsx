import { Typography } from 'components';
import { SymmetricEncryption } from 'assets';
import Image from 'next/image';
import styles from './styles.module.scss';

const Security = () => (
  <div className={styles.security}>
    <Typography
      className={styles.security_title}
      type="h2"
    >
      Security page
    </Typography>
    <div className={styles.main}>
      <div className={styles.main_wrapper}>
        <Typography
          className={styles.main_title}
          type="h3"
        >
          Summary/introduction
        </Typography>
        <div className={styles.main_text}>
          Ensuring the security of user data is of paramount importance for the
          Archon team. In today&apos;s digital landscape, where data breaches
          and unauthorized access are prevalent, implementing robust security
          mechanisms is crucial. Archon employs a multi-layered approach to
          safeguard user data, with a focus on three main mechanisms:
          <ul>
            <li>
              <strong>RSA </strong>
              asymmetric encryption protocol - a well-known and time-tested
              protocol that permits to encrypt all the files stored within the
              Archon system and provide access to it only to its owner and
              authorized users. When a user uploads a file to the Archon system,
              it undergoes encryption using RSA. This means that even if an
              unauthorized party gains access to the encrypted files, they would
              be unable to decipher the content. (RSA){' '}
            </li>
            <li>
              <strong>key password</strong> - an additional layer of security
              implying the encryption of the owner’s private key with a custom
              password. It allows storing the users’ encryption keys on the
              backend side of the Archon application without lowering the
              security level. (Key Password)
            </li>
            <li>
              <strong>a backend vault for key storage</strong> - a special
              backend zone with additional security techniques for storing
              sensitive information, the users’ encryption keys in particular.
              (Vault)
            </li>
          </ul>
          By combining these measures, Archon aims to provide users with a
          secure and trustworthy platform for their data storage. In the
          following sections, we will delve into the details of each used
          mechanism, highlighting their significance and how they contribute to
          the overall security framework of Archon.{' '}
        </div>
        <Typography
          className={styles.main_title}
          type="h3"
        >
          How do we keep your data secure and private?
        </Typography>
        <div className={styles.main_text}>
          The Archon team considers the security of users’ data as the highest
          priority and tends to increase the security level using all possible
          opportunities. In this paragraph we briefly tell you about the way
          your file is encrypted and how it helps to safeguard the file from
          unauthorized access. Let’s start from the definition of encryption
          itself. According to <a href="https://#.com">wikipedia</a>,{' '}
          <strong>encryption</strong> is the process that converts the original
          representation of the information, known as plaintext, into an
          alternative form known as ciphertext. The goal is to let only
          authorized parties decrypt the ciphertext and get access to the
          valuable original information. In general, most encryption protocols
          can be divided into two groups - symmetric and asymmetric ones.
          <strong>Symmetric protocols</strong> generate one key that allows both
          encrypt and decrypt the information, i.e. sender and recipient use the
          same key. It is presented on the schemes below. In case Bob wants to
          transfer a file to Alice, they should beforehand somehow agree on
          which encryption key to use and keep it in secret. After the agreement
          is achieved, both parties can encrypt and decrypt messages for and
          from the other party using the same key.
        </div>
        <div className={styles.main_block_halfed}>
          <div className={styles.main_text}>
            The basic principles of symmetric encryption causes its main
            disadvantages:
            <ul>
              <li>
                <strong>Key Distribution</strong> - both should securely
                distribute the encryption key before they can use the system. If
                the key falls into the malicious party during distribution, it
                compromises the security of the entire system.
              </li>
              <li>
                <strong>Scalability</strong> - symmetric encryption becomes more
                challenging to manage as the number of parties involved
                increases. With each additional participant, a unique key needs
                to be securely distributed and that could be a complex task
                when.
              </li>
            </ul>
            More information about the symmetric encryption can be found here:
            <ul>
              <li>
                <a href="https://www.techtarget.com/searchsecurity/definition/asymmetric-cryptography">
                  https://www.techtarget.com/searchsecurity/definition/asymmetric-cryptography
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Public-key_cryptography">
                  https://en.wikipedia.org/wiki/Public-key_cryptography
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.main_img_block}>
            <Image
              src={SymmetricEncryption}
              alt="Symetric Encryption"
            />
          </div>
        </div>
        <div className={styles.main_text}>
          Unlike the symmetric protocols, the asymmetric type of encryption does
          not involve the aforementioned problems and therefore it is a better
          solution for many applications.
          <br />
          <br />
          <strong>Asymmetric encryption mechanism</strong> implies the usage of
          a key pair by each user - the public and the private one. The public
          key as it can be seen from its name can be shared with any other party
          without compromising any data, whereas the private key should be kept
          in secret by its owner. The public key is used for the encrypting of
          the information, so one can always take any public key and encrypt
          data for the corresponding user. However, since the private key is
          needed for decrypting the data, only the intended recipient who
          possesses the corresponding private key can decrypt and access the
          information.
        </div>
        <div className={styles.main_block_halfed}>
          <div className={styles.main_text}>
            To provide an example, let’s assume that Bob wants to send a private
            message to Alice. To do that, he should take Alice’s public key,
            encode the message with it and send it to Alice via an insecure
            channel. A message can be intercepted, but no one can decrypt the
            data besides Alice, because she is the only one who possesses the
            private key. So her only necessity is to keep the private key and
            not share it with anybody.
            <br />
            <br />
            Those, who want to dig into details about the asymmetric encryption,
            can check the reference:
            <ul>
              <li>
                <a href="https://www.techtarget.com/searchsecurity/definition/asymmetric-cryptography">
                  https://www.techtarget.com/searchsecurity/definition/asymmetric-cryptography
                </a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Public-key_cryptography">
                  https://en.wikipedia.org/wiki/Public-key_cryptography
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.main_img_block}>
            {/* <Image
                src={SymmetricEncryption}
                alt="Symetric Encryption"
              /> */}
          </div>
        </div>
        <div className={styles.main_block_halfed}>
          <div className={styles.main_text}>
            Furthermore, the asymmetric protocols help to avoid one of the most
            common types of attack called “Man in the middle” by allowing the
            creation of digital signatures. This attack type denotes a situation
            when the attacker intercepts the messages from the sender, modifies
            them, and sends further to the recipient pretending to be the
            sender. In other words, two parties communicate not with each other
            but with an unauthorized user without even knowing it. Digital
            signature prevents malicious behavior, because it implies a
            mechanism where all messages are signed with the sender’s private
            key, therefore the recipient can always verify the sender’s
            identity. More information about digital signature can be found
            here:
            <ul>
              <li>
                <a href="https://en.wikipedia.org/wiki/Man-in-the-middle_attack">
                  https://en.wikipedia.org/wiki/Man-in-the-middle_attack
                </a>
              </li>
              <li>
                <a href="https://bntan.medium.com/understanding-rsa-digital-signatures-cfba3bc67428">
                  https://bntan.medium.com/understanding-rsa-digital-signatures-cfba3bc67428
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.main_img_block}>
            {/* <Image
                src={SymmetricEncryption}
                alt="Symetric Encryption"
              /> */}
          </div>
        </div>
        <div className={styles.main_text}>
          The described principles involves that it is essential for a secure
          <strong>
            asymmetric encryption protocol to possess the following
            characteristics:
          </strong>
          <li>
            The protocol should be capable of generating some entities that can
            be used as key pairs.
          </li>
          <li>
            Data encrypted using a public key should be easily decrypted by
            using the corresponding private key.
          </li>
          <li>
            The private key should be extremely difficult to guess,
            necessitating very significant amounts of time and computational
            power.
          </li>
          <br />
          So, the mathematical basis behind an encryption algorithm should also
          fulfill them. And it is true for the most popular encryption protocol
          RSA which is based on the task of factoring the product of two large
          prime numbers that is also known as the &quot;factoring problem&quot;.
          Without going deep into math details, we’d say that it is extremely
          difficult to guess two prime numbers which result in the given large
          number after multiplication. The explanations of its complexity and
          the approximate brute-force break times can be found here:
          <ul>
            <li>
              <a href="https://joaoschmitt.wordpress.com/2018/09/17/cryptography-algorithm-rsa/">
                https://joaoschmitt.wordpress.com/2018/09/17/cryptography-algorithm-rsa/
              </a>
            </li>
            <li>
              <a href="https://crypto.stackexchange.com/questions/3043/how-much-computing-resource-is-required-to-brute-force-rsa">
                https://crypto.stackexchange.com/questions/3043/how-much-computing-resource-is-required-to-brute-force-rsa
              </a>
            </li>
          </ul>
        </div>
        <Typography
          className={styles.main_title}
          type="h3"
        >
          What is the key password and why is it needed?
        </Typography>
        <div className={styles.main_text}>
          Apart from the mentioned methods, the Archon system incorporates a
          feature known as multikey encryption ?. This serves as a complement to
          asymmetric protocols and enables the encryption of a file with
          multiple public keys. Consequently, the file can be decrypted using
          any corresponding private key. This mechanism offers flexibility in
          granting access to encrypted data to multiple recipients, which is
          particularly useful when a file needs to be shared with numerous
          users. With multikey encryption, there is no need to individually
          encrypt the data with different users&apos; private keys and store
          multiple copies. Instead, only one encrypted file copy needs to be
          stored, accessible to all authorized parties.
          <br /> <br /> By combining these principles, the Archon creates a
          multi-layered security approach that maximizes the protection of its
          storages. This comprehensive strategy ensures that sensitive
          information and valuable assets remain secure.
        </div>
        <div className={styles.main_text}>
          We introduce an additional security measure - the key password. In
          this section we will briefly explain this concept and how it helps to
          protect your data even more.
          <br /> <br />
          The encryption system presented above allows securely storing the
          files within the system, while the key password provides the
          additional protection for users’ private keys. Each user is asked to
          set this key password after he registered an account and uploads or
          downloads his first file to the system. After it is specified, the
          system generates the file encryption key pair and encodes the private
          key with the key password. Therefore, the private key is also stored
          in the encrypted form and cannot be used by an attacker even if it was
          compromised.
          <br /> <br />
          The user should enter the key password each time he downloads the file
          from the system in order to prove that he is the owner of the key
          pair. Thus, the decryption process has the following steps:
          <ul>
            <li>Key password decrypts the private key.</li>
            <li>Private key decrypts the file.</li>
          </ul>
          <br /> <br />
          Such an approach helps us to solve another issue related to the
          encryption system - transfer of the encryption keys to another device.{' '}
          <br />
          Initially, there was proposed a system, where all the encryption keys
          are stored on the client side of the application, to be more precise,
          in the browser local storage.
        </div>
        <div className={styles.main_text}>
          So, in case a user registers an account on his computer, but then
          wants to enter the app via his laptop or mobile phone, he has to
          somehow transfer the keys manually. This process would not be quite
          user-friendly and there would be a necessity for writing a special
          user instruction for this situation.
          <br /> But since the private key is additionally encrypted, we can
          store its copy on the backend side of the application without lowering
          the security level. A user will not have to worry about transferring
          the keys manually, the system will do it instead of him internally.
          <br /> In case the user enters the app from a new device, all we need
          to do is ensure that this is indeed the user himself, not the
          attacker. And the key password is an excellent opportunity to do that
          in addition to the standard authorization process with email and login
          password. The user will be asked to enter the key password as an extra
          approval that he is the owner of the account.
          <br /> <br /> A few more additional notes: the encrypted private
          <ul>
            <li>
              keys will be stored in the special extra-secured backend section
              called Vault. It will increase the security and privacy of private
              keys as well as the security of the system in general;
            </li>
            <li>
              at the current version the functionality of changing the key
              password is not implemented for simplification, it will be added
              later;
            </li>
            <li>
              the significant advantage is that the user is not limited by the
              format for the key password, it will not be a random or unreadable
              string of symbols, he can enter any memorizable password he wants.
            </li>
          </ul>
        </div>
        <Typography
          className={styles.main_title}
          type="h3"
        >
          Vault
        </Typography>
        <div className={styles.main_text}>
          The Archon project integrates a popular open-source tool called
          HashiCorp Vault which is commonly used for securely storing and
          accessing sensitive data in modern computing environments. Vault
          provides a centralized solution for managing so-called secrets or in
          other words sensitive information such as passwords, API tokens or
          database credentials. As for the Archon main use case in particular,
          it is the secure storing and monitoring of the users’ encryption keys
          whose concepts and usage were described in previous sections (
          <a href="https://#.com">link1</a> and
          <a href="https://#.com">link2</a>
          ).
          <br /> <br /> First of all, Vault provides secure audit trail
          instruments which logs all access and operations performed on secrets.
          This helps with compliance requirements and provides visibility into
          who accessed what secrets and when.
          <br /> <br /> One of the Vault key features is its dynamic secrets
          capability. It can generate short-lived credentials for various
          systems and services, reducing the risk of long-term exposure. This
          concept also implements the idea that each service should be provided
          with its own unique credentials granting access to a particular data
          or source. So even if the low-possible leakage of secrets has
          happened, the malicious instance gets access only to a piece of data
          and it is always possible to precisely track such an issue and ban the
          intruder.
        </div>
        <div className={styles.main_text}>
          Vault provides wide opportunities for further development of the
          Archon project and upgrading its architecture since it supports
          various popular services, for example, authentication methods,
          including tokens, username/password, and multi-factor authentication.
          It integrates with popular identity providers like LDAP, Active
          Directory, and cloud providers for seamless authentication.
          <br /> <br /> HashiCorp takes security seriously and actively works to
          address any vulnerabilities that may arise. The open-source nature of
          HashiCorp allows for transparency, enabling users and specialists to
          review the code and identify any potential security issues. Moreover,
          it periodically undergoes audits from professional audit teams and
          confirms its commitment to reliability.
          <br /> <br /> Overall, HashiCorp Vault is a powerful tool for managing
          secrets securely, providing organizations with a robust solution to
          protect sensitive data in modern computing environments. Archon
          integrates it for secure storing of the users&apos; encryption key at
          the current stage of the project development as a strong and reliable
          tool, but it also opens huge possibilities for further security system
          upgrade, complication and optimization.
          <br /> <br /> These principles and much more are described in detail
          in the documentation of HashiCorp itself and you can see it in case
          you are interested in more specific nuances -
          <a href="https://developer.hashicorp.com/vault/docs?product_intent=vault">
            https://developer.hashicorp.com/vault/docs?product_intent=vault
          </a>
        </div>
      </div>
    </div>
  </div>
);

export { Security };
